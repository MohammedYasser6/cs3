"use client";

import { useState } from "react";
import Link from "next/link";
import CryptographyVisualizer from "@/components/canvas/CryptographyVisualizer";
import CodeViewer from "@/components/ui/CodeViewer";

const CRYPTO_CODE = {
  Python: `import hashlib

def secure_password_hash(password: str) -> str:
    # Never store plain-text passwords!
    # We use SHA-256 to create a one-way mathematical digest
    
    # 1. Encode string to raw bytes
    encoded_bytes = password.encode('utf-8')
    
    # 2. Generate the SHA-256 hash object
    hash_obj = hashlib.sha256(encoded_bytes)
    
    # 3. Output the final hexadecimal string
    return hash_obj.hexdigest()

print(secure_password_hash("admin123"))
# Output: 240be518fabd2724ddb6f04eeb1da596...`,

  Java: `import java.security.MessageDigest;

public class SecurityUtils {
    public static String hashPassword(String password) throws Exception {
        // Initialize SHA-256 Digest
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        
        // Hash the bytes
        byte[] encodedhash = digest.digest(password.getBytes());
        
        // Convert raw bytes to Hexadecimal String
        StringBuilder hexString = new StringBuilder(2 * encodedhash.length);
        for (int i = 0; i < encodedhash.length; i++) {
            String hex = Integer.toHexString(0xff & encodedhash[i]);
            if(hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }
}`,

  Kotlin: `import java.security.MessageDigest

fun hashPassword(password: String): String {
    val bytes = password.toByteArray()
    val md = MessageDigest.getInstance("SHA-256")
    val digest = md.digest(bytes)
    
    // Kotlin provides elegant byte-to-hex conversion
    return digest.joinToString("") { 
        "%02x".format(it) 
    }
}`,

  "C++": `#include <iostream>
#include <openssl/sha.h> // Industry standard OpenSSL

std::string hashPassword(const std::string& password) {
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, password.c_str(), password.size());
    SHA256_Final(hash, &sha256);
    
    char hex_string[SHA256_DIGEST_LENGTH * 2 + 1];
    for(int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        sprintf(&hex_string[i*2], "%02x", hash[i]);
    }
    return std::string(hex_string);
}`,
};

export default function CryptographyPage() {
  const [activeTab, setActiveTab] = useState<"theory" | "code">("theory");

  return (
    <section className="flex h-full w-full overflow-hidden text-slate-200">
      {/* LEFT COLUMN: Docked Sidebar */}
      <div className="w-1/3 min-w-[350px] max-w-[500px] bg-slate-900 border-r border-slate-800 flex flex-col z-10 shadow-2xl animate-slide-up">
        <div className="p-8 pb-0 mb-6">
          <p className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-1">
            Cyber Track • Level 1
          </p>
          <h2 className="text-3xl font-bold text-white drop-shadow-md mb-6">
            Cryptography Basics
          </h2>

          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "theory" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              The CIA Triad
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${activeTab === "code" ? "bg-emerald-600 text-white" : "text-slate-500 hover:text-slate-300"}`}
            >
              Hashing Implementation
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-0">
          {activeTab === "theory" ? (
            <div className="space-y-6 animate-fade-in text-sm leading-relaxed text-slate-300">
              <div>
                <p>
                  Security engineering is built entirely upon three core
                  principles known as the{" "}
                  <strong className="text-emerald-400">CIA Triad</strong>:
                  Confidentiality, Integrity, and Availability. Cryptography is
                  the mathematical tool we use to enforce them.
                </p>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-emerald-400 font-bold mb-2 text-sm">
                  Confidentiality (Encryption)
                </h4>
                <p className="text-xs text-slate-400 mb-2">
                  Ensuring data is kept secret from unauthorized eyes.
                </p>
                <ul className="list-disc space-y-2 pl-4 text-xs text-slate-400">
                  <li>
                    <strong className="text-white">Symmetric (AES):</strong> The
                    same key is used to both lock and unlock the data. It is
                    extremely fast and used for bulk data.
                  </li>
                  <li>
                    <strong className="text-white">Asymmetric (RSA):</strong>{" "}
                    Uses a Public Key to lock, and a Private Key to unlock.
                    Slower, but solves the problem of securely sharing the key
                    over the internet.
                  </li>
                </ul>
              </div>

              <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg">
                <h4 className="text-emerald-400 font-bold mb-2 text-sm">
                  Integrity (Hashing)
                </h4>
                <p className="text-xs text-slate-400">
                  Ensuring data has not been altered or tampered with. A Hash
                  (like SHA-256) is a{" "}
                  <strong className="text-rose-400">
                    one-way mathematical function
                  </strong>
                  . You cannot reverse a hash back into the password, which
                  makes it safe to store in a database.
                </p>
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <CodeViewer
                snippets={CRYPTO_CODE}
                explanation="In modern backends (like ASP.NET Core or Spring Boot), developers never write their own cryptography. Always use standard libraries to generate SHA-256 hashes for passwords before storing them."
              />
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Full Viewport Visualizer */}
      <div className="flex-1 flex flex-col relative bg-slate-950 animate-fade-in">
        <div className="flex-1 w-full h-full relative overflow-hidden">
          <CryptographyVisualizer />
        </div>

        <div className="h-24 border-t border-slate-800 bg-slate-900 flex items-center justify-between px-8 z-10">
          <p className="text-xs text-slate-400 font-mono">
            Algorithm Simulator Sandbox
          </p>
          <Link
            href="/cyber/cryptography/quiz"
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
          >
            Take Assessment (+150 Cyber XP)
          </Link>
        </div>
      </div>
    </section>
  );
}
