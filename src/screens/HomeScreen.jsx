<div className="px-4 py-6 flex flex-col items-center">
  <motion.img
    src="/logotipo-tanalista.png"
    alt="Logo Tá na Lista"
    className="w-24 h-auto mb-3 drop-shadow-lg"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
  />
  <motion.h1 
    className="text-2xl font-bold text-white text-center"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    Listas de Compras
  </motion.h1>
  <motion.p 
    className="text-white/80 text-center mt-1"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    Organize suas compras com facilidade
  </motion.p>
</div>
