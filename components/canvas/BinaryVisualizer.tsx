"use client";

import { Text } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

interface BinaryProps {
  decimalValue: number;
}

export default function BinaryVisualizer({ decimalValue }: BinaryProps) {
  // Convert the decimal number (e.g., 13) to an 8-bit binary string (e.g., "00001101")
  const binaryString = decimalValue.toString(2).padStart(8, "0");
  const bits = binaryString.split("").map(Number);

  const spacing = 1.2;
  const xOffset = -(8 * spacing) / 2 + spacing / 2;

  // The power of 2 for each bit position (128, 64, 32... 1)
  const powers = [128, 64, 32, 16, 8, 4, 2, 1];

  return (
    <group position={[xOffset, 0, 0]}>
      {bits.map((bit, index) => {
        const isOne = bit === 1;
        const color = isOne ? "#22c55e" : "#334155"; // Green for 1, Gray for 0
        const yPos = isOne ? 0.5 : 0; // Move up if 1

        return (
          <group key={index} position={[index * spacing, yPos, 0]}>
            {/* The Bit Switch */}
            <mesh>
              <boxGeometry
                args={[0.9, 1, 0.9]}
                {...({} as ThreeElements["boxGeometry"])}
              />
              <meshStandardMaterial
                color={color}
                opacity={isOne ? 0.9 : 0.5}
                transparent
                {...({} as ThreeElements["meshStandardMaterial"])}
              />
            </mesh>

            {/* The 0 or 1 Label */}
            <Text
              position={[0, 0, 0.51]}
              fontSize={0.6}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {bit.toString()}
            </Text>

            {/* The Place Value (128, 64, etc.) printed below */}
            <Text
              position={[0, -1.2, 0]}
              fontSize={0.25}
              color="#94a3b8"
              anchorX="center"
            >
              {powers[index].toString()}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
