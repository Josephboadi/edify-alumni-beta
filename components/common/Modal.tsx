"use client";

const ModalForm = ({ closeModal, children }: any) => {
  return (
    <div
      className="fixed left-0 top-0 w-[100%] h-[100%] flex items-center justify-center bg-[rgba(0,0,0,.8)] z-[1908000000000] px-[20px]"
      id="modal-container"
      onClick={(e: any) => {
        // if (e.target.className === "modal-container")
        if (e.target.id === "modal-container") closeModal();
      }}
    >
      <div className="!p-0 !m-0  w-max  flex items-center justify-center !bg-transparent border-none !z-[19080000000000] max-h-[96vh] overflow-y-auto no-scrollbar shadow-lg !rounded-xl">
        <div
          className=" absolute right-6 top-2 flex justify-end text-xl"
          onClick={() => closeModal()}
        >
          <p className="cursor-pointer">&times;</p>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalForm;
