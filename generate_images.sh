#!/bin/bash

# Extract URL via regex or just assume the stdout is the URL if it only prints URL
# Actually, higgsfield generate create ... --wait prints the URL to stdout on success.

echo "Generating Hero Image (1/4)..."
URL1=$(higgsfield generate create gpt_image_2 --prompt "A premium, cinematic documentary-style photograph of two experienced Indian maritime ship captains in authentic professional naval uniforms, standing on the modern bridge of a large commercial vessel looking out to sea. Candid moment, natural window lighting, high-end corporate photography, hyper-realistic, shot on 35mm lens, organic film grain, authentic details, non-AI look." --aspect_ratio 16:9 --resolution 4k --wait)
echo "Hero URL: $URL1"

echo "Generating Edge Image (2/4)..."
URL2=$(higgsfield generate create gpt_image_2 --prompt "A documentary-style photograph of an experienced Indian chief engineer inspecting the modern engine room of a large cargo ship. Authentic industrial photography, hyper-realistic, sharp focus, practical lighting, shot on 35mm lens, Kodak Portra 400, organic film grain, non-AI look." --aspect_ratio 4:3 --resolution 2k --wait)
echo "Edge URL: $URL2"

echo "Generating Services Image (3/4)..."
URL3=$(higgsfield generate create gpt_image_2 --prompt "An authentic wide photograph of a massive commercial container ship being loaded at a bustling modern port during golden hour. Documentary style, natural sunlight, hyper-realistic, professional marine photography, shot on 35mm lens, organic film grain, non-AI look." --aspect_ratio 4:3 --resolution 2k --wait)
echo "Services URL: $URL3"

echo "Generating HQ Image (4/4)..."
URL4=$(higgsfield generate create gpt_image_2 --prompt "A beautiful real-world photograph of a modern glass corporate office building in Ernakulam Kochi Kerala, surrounded by lush tropical palm trees. Coastline faintly visible in the background. Tropical sunny morning, authentic architectural photography, hyper-realistic, shot on 35mm lens, natural lighting, organic film grain, non-AI look." --aspect_ratio 4:3 --resolution 2k --wait)
echo "HQ URL: $URL4"

echo "Downloading images..."
wget -qO src/marevitamarine/public/assets/about/hero.jpg "$URL1"
wget -qO src/marevitamarine/public/assets/about/edge.jpg "$URL2"
wget -qO src/marevitamarine/public/assets/about/services.jpg "$URL3"
wget -qO src/marevitamarine/public/assets/about/hq.jpg "$URL4"
echo "Done!"
