export default function Loading() {
  return (
    <div className="p-10">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 p-5 rounded-xl shadow-md min-h-40 *:animate-pulse"
        >
          <div className="flex gap-3 items-center">
            <div className="size-12 rounded-full bg-neutral-400" />
            <div className="flex flex-col gap-0.5">
              <div className="w-20 h-4 rounded-xl bg-neutral-400" />
              <div className="w-12 h-4 rounded-xl bg-neutral-400" />
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="w-52 h-4 rounded-xl bg-neutral-400" />
            <div className="w-48 h-4 rounded-xl bg-neutral-400" />
            <div className="w-12 h-4 rounded-xl bg-neutral-400" />
          </div>
        </div>
      ))}
    </div>
  );
}
