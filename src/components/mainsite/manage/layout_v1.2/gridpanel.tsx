export default function GridPanel({
  title,
  value,
  small,
}: {
  title: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="bg-neutral-800 rounded-lg p-3 flex flex-col justify-between">
      <div className="text-xs text-gray-400">{title}</div>
      <div className={`font-bold ${small ? "text-xl" : "text-4xl"}`}>{value}</div>
    </div>
  );
}
