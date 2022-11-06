interface IHeaderProps {
  title: string;
}

export function Header({ title }: IHeaderProps) {
  return <h2 className="text-xl text-[white] font-semibold">{title}</h2>;
}
