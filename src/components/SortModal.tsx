type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function SortModal({ onClose, children }: Props) {
  return (
    <section
      className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-[110%] z-50"
      onClick={(event) => {
        if (event?.target === event?.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white w-4/5 max-w-7xl rounded-3xl">{children}</div>
    </section>
  );
}
