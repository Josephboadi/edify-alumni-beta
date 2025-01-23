const Heading = ({ title }: any) => {
  return (
    <div className="w-full mt-2 pt-2 pl-2 flex gap-6 items-center">
      {/* <DynamicIcons name={icon} style={`text-4xl`} /> */}
      <p className="text-3xl font-bold">{title}</p>
    </div>
  );
};

export default Heading;
