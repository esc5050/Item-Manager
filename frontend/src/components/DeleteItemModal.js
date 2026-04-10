function DeleteItemModal({ isOpen, itemName, onCancel, onConfirm, loading }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-[2rem] theme-surface-strong p-6">
        <h2
          className="text-2xl font-black mb-3"
          style={{ color: "var(--text-main)" }}
        >
          Confirmar exclusão
        </h2>

        <p className="mb-6 leading-relaxed" style={{ color: "var(--text-soft)" }}>
          Você tem certeza que deseja deletar
          {itemName ? ` o item "${itemName}"` : " este item"}?
          Essa ação não pode ser desfeita.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-3 rounded-2xl font-bold transition theme-outline-btn"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-3 rounded-2xl font-bold transition"
            style={{
              background: "var(--danger)",
              color: "#ffffff",
              opacity: loading ? 0.75 : 1
            }}
          >
            {loading ? "Deletando..." : "Deletar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemModal;
