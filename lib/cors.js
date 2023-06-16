import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000/', // Ubah sesuai dengan URL Next.js lokal Anda
  optionsSuccessStatus: 200 // Beberapa browser memerlukan status 200 untuk mengizinkan akses
};

export default cors(corsOptions);
