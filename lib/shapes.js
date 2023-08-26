// Shape constructor with empty color 
class Shape {
    constructor() {
      this.color = "";
    }
  }

  // Triangle, square and circle class renders shape based on the polygon coordinates 
  class Triangle extends Shape {
    render() {
      // Returns polygon with color input from inquirer
      return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`;
    }
  }
  class Square extends Shape {
    render() {
      return `<square x="73" y="40" width="160" height="160" fill="${this.color}" />`;
    }
  }
  class Circle extends Shape {
    render() {
      return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`;
    }
  }
  // Exports square, triangle, circle)
  module.exports = { Triangle, Square, Circle };