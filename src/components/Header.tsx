interface IHeaderProps {
  title: string;
  size?: string;
}

export function Header({ title, size }: IHeaderProps) {
  return (
    <h2
      className={"mt-4 mb-2 text-light font-semibold text-" + (size ?? "2xl")}
    >
      {title}
    </h2>
  );
}
