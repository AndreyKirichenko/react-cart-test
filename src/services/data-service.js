export default class DataService {

  getItems(quantity=5) {
    let data = [];

    for(let i = 1; i <= quantity; i++) {
      data.push(
        {
          id: i,
          price: Math.round(Math.random() * 500),
          title: `Торт ${i}`
        }
      );
    }

    return data;
  }

  getData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getItems());
      }, 1000);
    })
  }
};
