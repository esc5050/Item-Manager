export const flags = {
  USSR: "/flags/ussr.png",
  USA: "/flags/usa.png",
  Alemanha: "/flags/alemanha.png",
  França: "/flags/franca.png",
  "Reino Unido": "/flags/reino_unido.png",
  China: "/flags/china.png",
  Japão: "/flags/japao.png",
  Itália: "/flags/italia.png",
  Suécia: "/flags/suecia.png",
};

export const getFlag = (pais) => {
  return flags[pais] || null;
};
