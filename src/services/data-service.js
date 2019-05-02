export default class DataService {

  getItems(quantity=200) {
    let data = [];

    for(let i = 0; i < quantity; i++) {
      data.push(
        {
          id: i,
          price: Math.random() * 500,
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
