"use client";

import { useState } from "react";
import Link from "next/link";
import GenerativeAIVisualizer from "@/components/canvas/GenerativeAIVisualizer";
const GAN_CODE = {
  Python: `import torch.nn as nn

# The Generator tries to create fake images from random noise
class Generator(nn.Module):
    def forward(self, noise):
        return self.model(noise) # Outputs fake image

# The Discriminator tries to guess if an image is Real or Fake
class Discriminator(nn.Module):
    def forward(self, image):
        return self.model(image) # Outputs probability (0 to 1)

# Training Loop Concept
def train_step(real_images, noise):
    # 1. Generator creates fakes
    fake_images = generator(noise)
    
    # 2. Discriminator judges both
    real_preds = discriminator(real_images)
    fake_preds = discriminator(fake_images)
    
    # 3. Backpropagate (Generator wants fake_preds near 1, 
    # Discriminator wants fake_preds near 0)`,
  "C++": `// GAN architectures require two separate optimizers
auto gen_optimizer = torch::optim::Adam(generator->parameters(), 0.0002);
auto disc_optimizer = torch::optim::Adam(discriminator->parameters(), 0.0002);

void train_step(torch::Tensor real_images, torch::Tensor noise) {
    auto fake_images = generator->forward(noise);
    
    auto real_preds = discriminator->forward(real_images);
    auto fake_preds = discriminator->forward(fake_images);
    // Calculate losses and call .backward() independently
}`,
  Java: `// Concept loop
public void trainStep(Matrix realImages, Matrix noise) {
    Matrix fakeImages = generator.forward(noise);
    
    double realLoss = discriminator.trainOn(realImages, 1.0); // Real = 1
    double fakeLoss = discriminator.trainOn(fakeImages, 0.0); // Fake = 0
    
    // Generator tries to trick discriminator
    generator.trainOn(discriminator.getGradients(), 1.0); 
}`,
  Kotlin: `fun trainStep(realImages: Tensor, noise: Tensor) {
    val fakeImages = generator(noise)
    
    val dLossReal = discriminator.loss(realImages, target = 1.0)
    val dLossFake = discriminator.loss(fakeImages, target = 0.0)
    
    val gLoss = generator.loss(discriminator(fakeImages), target = 1.0)
}`,
};

export default function GenerativeAIPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "llms">("theory");

  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-1">
            AI Track • Level 11
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Generative AI
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Generative Models
            </button>
            <button
              onClick={() => setActiveTab("llms")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "llms" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              LLMs
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" ? (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>
                  Discriminative AI predicts a label (e.g., "Is this a dog?").{" "}
                  <strong className="text-purple-400">Generative AI</strong>{" "}
                  learns the mathematical distribution of the training data and
                  uses it to synthesize entirely new data.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">
                  GANs (Generative Adversarial Networks)
                </h4>
                <p className="text-xs text-slate-400">
                  Two networks fight each other. The{" "}
                  <strong className="text-emerald-400">Generator</strong>{" "}
                  creates fake images to trick the system. The{" "}
                  <strong className="text-rose-400">Discriminator</strong> tries
                  to spot the fakes. They train until the Generator's fakes are
                  indistinguishable from reality.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-2 text-sm">
                  Diffusion Models (Midjourney/DALL-E)
                </h4>
                <p className="text-xs text-slate-400">
                  Takes a perfect image and slowly adds static noise until it's
                  completely destroyed. A neural network is then trained to
                  reverse the process, learning how to "denoise" static back
                  into a coherent image based on text prompts.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in text-sm text-slate-300">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-purple-400 font-bold mb-3 text-sm">
                  Large Language Models (LLMs)
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  ChatGPT is not a database of facts. It is fundamentally an
                  autocomplete engine powered by massive Transformer
                  architectures.
                </p>
                <p className="text-xs text-slate-400 border-l-2 border-purple-500 pl-3">
                  Given a sequence of input tokens, an LLM calculates the
                  probability distribution for what the{" "}
                  <strong>most mathematically logical next token</strong> should
                  be. It generates text one single word at a time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <GenerativeAIVisualizer />
        </div>
        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Latent Space Generation
          </p>
          <Link
            href="/ai/generative-ai/quiz"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Final Exam (+400 AI XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
