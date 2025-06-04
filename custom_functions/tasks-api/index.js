module.exports = async (server) => {
  server.get('/api/tasks/stats', async (req, res) => {
    const sql = 'SELECT completed FROM harper_demo.tasks';
    const response = await server.harperdb.query(sql);

    const total = response.length;
    const completed = response.filter(row => row.completed === true).length;
    const pending = total - completed;

    res.send({
      total,
      completed,
      pending
    });
  });
};