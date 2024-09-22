import PaystackCheckout from "../components/PaystackCheckout";
const CheckOut = ({ amountToPay, user, setamountToPay }) => {
  let handlePay = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="bg-white p-6 my-4 rounded-md">
      <h1 className="font-semibold text-2xl mb-3">CHECKOUT</h1>
      <div>
        <form onSubmit={handlePay}>
          <div className="my-4">
            <h1 className=" mb-2 uppercase font-bold text-[12px] text-[#ffa45c]">
              billing details
            </h1>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label className="mb-1 text-1xl capitalize font-semibold">
                  name
                </label>
                <input
                  type="name"
                  className="p-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-1xl capitalize font-semibold">
                  email address
                </label>
                <input
                  type="name"
                  className="p-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-1xl capitalize font-semibold">
                  phone number
                </label>
                <input
                  type="name"
                  className="p-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h1 className=" mb-2 uppercase font-bold text-[12px] text-[#ffa45c]">
              shipping info
            </h1>
            <div className="grid md:grid-cols-2 gap-2">
              <div className="flex flex-col col-span-2">
                <label className="mb-1 text-1xl capitalize font-semibold">
                  address
                </label>
                <input
                  type="name"
                  className="p-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-1xl capitalize font-semibold">
                  zip code
                </label>
                <input
                  type="name"
                  className="p-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-1xl capitalize font-semibold">
                  city
                </label>
                <input
                  type="name"
                  className="p-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 text-1xl capitalize font-semibold">
                  country
                </label>
                <input
                  type="name"
                  className="p-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          {setamountToPay !== 0 && (
            <div className="w-full">
              <PaystackCheckout amount={amountToPay} userEmail={user}>
                <h1 className="uppercase  text-center  my-4 bg-[#ffa45c] p-2 rounded-sm text-white">
                  continue and pay
                </h1>
              </PaystackCheckout>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
