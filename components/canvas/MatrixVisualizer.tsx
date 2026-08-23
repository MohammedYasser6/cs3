"use client";

import { Text } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

interface MatrixProps {
  matrix: number[][];
  activeCell: [number, number] | null; // [row, col]
}

export default function MatrixVisualizer({ matrix, activeCell }: MatrixProps) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const spacing = 1.2;

  // Center the grid dynamically based on its dimensions
  const xOffset = -(cols * spacing) / 2 + spacing / 2;
  const yOffset = (rows * spacing) / 2 - spacing / 2;

  return (
    <group position={[xOffset, yOffset, 0]}>
      {matrix.map((row, rIndex) =>
        row.map((val, cIndex) => {
          const isActive =
            activeCell && activeCell[0] === rIndex && activeCell[1] === cIndex;
          const color = isActive ? "#eab308" : "#ec4899"; // Yellow if active, Pink otherwise
          const zPos = isActive ? 0.3 : 0; // Pop out slightly when active

          return (
            <group
              key={`${rIndex}-${cIndex}`}
              position={[cIndex * spacing, -rIndex * spacing, zPos]}
            >
              <mesh>
                <boxGeometry
                  args={[0.95, 0.95, 0.5]}
                  {...({} as ThreeElements["boxGeometry"])}
                />
                <meshStandardMaterial
                  color={color}
                  opacity={0.8}
                  transparent
                  {...({} as ThreeElements["meshStandardMaterial"])}
                />
              </mesh>

              <Text
                position={[0, 0, 0.26]}
                fontSize={0.4}
                color="white"
                anchorX="center"
                anchorY="middle"
              >
                {val.toString()}
              </Text>

              {/* Show coordinates [r][c] underneath the active cell */}
              {isActive && (
                <Text
                  position={[0, -0.65, 0]}
                  fontSize={0.25}
                  color="#fde047"
                  anchorX="center"
                >
                  [{rIndex}][{cIndex}]
                </Text>
              )}
            </group>
          );
        }),
      )}
    </group>
  );
}
