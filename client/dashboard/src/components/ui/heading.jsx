export const Heading = ({ title, description = "" }) => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
