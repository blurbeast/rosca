import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, style } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Option 1: HuggingFace AI
    if (process.env.HUGGINGFACE_API_KEY) {
      try {
        const enhancedPrompt = `${prompt}. Style: ${style}. High quality, detailed NFT artwork, professional, square format, vibrant colors, masterpiece`;

        const hfResponse = await fetch(
          "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inputs: enhancedPrompt,
              parameters: {
                guidance_scale: 0.0, // FLUX.1-schnell works best with 0.0
                num_inference_steps: 4, // Fast generation
                width: 1024,
                height: 1024,
              },
            }),
          }
        );

        if (hfResponse.ok) {
          const imageBlob = await hfResponse.blob();
          const base64 = Buffer.from(await imageBlob.arrayBuffer()).toString(
            "base64"
          );
          return NextResponse.json({
            imageUrl: `data:image/jpeg;base64,${base64}`,
            service: "huggingface-flux",
          });
        } else if (hfResponse.status === 503) {
          // Model is loading, try alternative model
          const altResponse = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                inputs: enhancedPrompt,
                parameters: {
                  negative_prompt:
                    "blurry, low quality, distorted, watermark, text, signature",
                  num_inference_steps: 20,
                  guidance_scale: 7.5,
                  width: 1024,
                  height: 1024,
                },
              }),
            }
          );

          if (altResponse.ok) {
            const imageBlob = await altResponse.blob();
            const base64 = Buffer.from(await imageBlob.arrayBuffer()).toString(
              "base64"
            );
            return NextResponse.json({
              imageUrl: `data:image/jpeg;base64,${base64}`,
              service: "huggingface-sdxl",
            });
          }
        }
      } catch (error) {
        console.error("Hugging Face error:", error);
      }
    }

    // Option 2: Pollinations AI
    try {
      const enhancedPrompt = `${prompt}. Style: ${style}. High quality, detailed NFT artwork, professional, masterpiece`;
      const pollinationsPrompt = encodeURIComponent(enhancedPrompt);
      const randomSeed = Math.floor(Math.random() * 1000000);

      const pollinationsUrl = `https://image.pollinations.ai/prompt/${pollinationsPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true&enhance=true&model=flux`;

      // Verify the image is accessible
      const testResponse = await fetch(pollinationsUrl, { method: "HEAD" });

      if (testResponse.ok) {
        return NextResponse.json({
          imageUrl: pollinationsUrl,
          service: "pollinations",
          seed: randomSeed,
        });
      }
    } catch (error) {
      console.error("Pollinations error:", error);
    }

    // Final fallback: Generate a themed placeholder
    const placeholderSeed = Math.floor(Math.random() * 1000);
    const placeholderUrl = `https://picsum.photos/seed/${placeholderSeed}/1024/1024?grayscale&blur=1`;

    return NextResponse.json({
      imageUrl: placeholderUrl,
      service: "placeholder",
      message: "AI generation unavailable, using placeholder image",
    });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
