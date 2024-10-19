import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="p-6">
      <LinkButton to="/menu">&larr; Kembali ke menu</LinkButton>

      <p className="font-semibold mt-8">
        Keranjangmu kosong. Coba pesen pizza dulu :)
      </p>
    </div>
  );
}

export default EmptyCart;
