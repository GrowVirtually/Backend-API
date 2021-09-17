process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION! 😔😔 Shutting down..');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// for unhandled promise exceptions
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 😔😔 Shutting down..');
  // console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
