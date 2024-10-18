import app from '../app';
import http from 'http';
import { connectDB } from '../config/db.config';

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port, async () => {
  await connectDB();
  console.log(`Server running on port ${port}`);
});

function normalizePort(val: string) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
