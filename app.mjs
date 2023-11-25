function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

  const getResults = async () => {
    try {
      const [resultTina, resultJorge, resultJulien] = await Promise.all([
        luckyDraw('Tina'),
        luckyDraw('Jorge'),
        luckyDraw('Julien')
      ]);
  
      console.log(resultTina);
      console.log(resultJorge);
      console.log(resultJulien);
  
    } catch (error) {
      console.error(error);
    }
  };

  getResults()
  