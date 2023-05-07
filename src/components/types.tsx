// Building LOOSE AUTOCOMPLETE with TypeScript - Advanced TypeScript
export type IconSize = LooseAutoComplete<"sm" | "md" | "lg">;

// ma aafai banauxu type helper
export type LooseAutoComplete<T extends string> = T | Omit<string, T>;

export interface IconProps {
  size?: IconSize;
}

export const Icon = ({ size = "md" }: IconProps) => {
  return <div className={size as string}>{"Icon"}</div>;
};

export const Component = () => {
  return (
    <div>
      <Icon size={"sm"} />
      <Icon size={"md"} />
      <Icon size={"lg"} />
      <Icon size={"lg"} />
    </div>
  );
};
