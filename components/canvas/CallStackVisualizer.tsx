"use client";

import { Text } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

export interface StackFrame {
  id: number;
  n: number;
  label: string;
  state: "calling" | "returning" | "resolved";
  returnValue: number | null;
  expression: string; // The math it's currently processing
}

interface CallStackProps {
  frames: StackFrame[];
}

export default function CallStackVisualizer({ frames }: CallStackProps) {
  const spacing = 1.4;

  return (
    <group position={[0, -2.5, 0]}>
      {frames.map((frame, index) => {
        // Colors based on state
        let color = "#f97316"; // Orange (Calling / Paused)
        if (frame.state === "returning") color = "#22c55e"; // Green (Resolving)
        if (frame.state === "resolved") color = "#334155"; // Gray (Done/Popped)

        const yPos = index * spacing;
        const opacity = frame.state === "resolved" ? 0.2 : 0.9;

        // Expression text colors
        const expColor =
          frame.state === "calling"
            ? "#ffedd5"
            : frame.state === "returning"
              ? "#ecfdf5"
              : "#94a3b8";

        return (
          <group key={frame.id} position={[0, yPos, 0]}>
            <mesh>
              <boxGeometry
                args={[5, 1.2, 1]}
                {...({} as ThreeElements["boxGeometry"])}
              />
              <meshStandardMaterial
                color={color}
                opacity={opacity}
                transparent
                {...({} as ThreeElements["meshStandardMaterial"])}
              />
            </mesh>

            {/* Top Line: Function Signature */}
            <Text
              position={[0, 0.25, 0.51]}
              fontSize={0.35}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {frame.label}
            </Text>

            {/* Bottom Line: The Deferred Math / Return Value */}
            <Text
              position={[0, -0.2, 0.51]}
              fontSize={0.25}
              color={expColor}
              anchorX="center"
              anchorY="middle"
            >
              {frame.expression}
            </Text>

            {/* Re-added the returning arrow, pushed slightly to the right to fit the wider box! */}
            {frame.state === "returning" && frame.returnValue !== null && (
              <Text
                position={[2.8, 0, 0]}
                fontSize={0.4}
                color="#4ade80"
                anchorX="left"
                anchorY="middle"
              >
                ↳ returns {frame.returnValue}
              </Text>
            )}
          </group>
        );
      })}

      {/* Stack Overflow Limit */}
      <mesh position={[0, 6 * spacing, 0]}>
        <boxGeometry
          args={[5.5, 0.1, 1.5]}
          {...({} as ThreeElements["boxGeometry"])}
        />
        <meshStandardMaterial
          color="#ef4444"
          opacity={0.3}
          transparent
          {...({} as ThreeElements["meshStandardMaterial"])}
        />
      </mesh>
      <Text position={[0, 6 * spacing + 0.3, 0]} fontSize={0.3} color="#ef4444">
        Stack Memory Limit (Stack Overflow)
      </Text>
    </group>
  );
}
