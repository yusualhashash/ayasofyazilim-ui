interface IPageHeaderProps {
  description: string;
  title: string;
}
export const PageHeader = ({ title, description }: IPageHeaderProps) => (
  <div className="mb-5">
    <h1 className="text-2xl font-medium">{title}</h1>
    <p className="text-sm text-neutral-500">{description}</p>
  </div>
);
