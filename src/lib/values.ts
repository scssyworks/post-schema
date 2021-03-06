import random from './random';

const loremIpsum = `Lorem ipsum dolor sit amet Qui consectetur modi ut beatae quos aut dolor fuga ex quod rerum aut rerum maiores Sit quaerat dolore aut consectetur sunt qui corporis nostrum Aut deleniti cupiditate sed tempore galisum qui eius earum ut ullam reprehenderit 33 possimus molestias Ut voluptates odio aut consequatur sint ut eaque voluptate qui eius dolores Ea eveniet iusto non autem suscipit ut nesciunt sunt ut dolores explicabo eum eveniet quaerat Cum officiis similique aut quia nihil in molestiae quisquam ut neque soluta Et perferendis dicta vel impedit omnis aut pariatur facere sed optio perferendis et galisum odit vel corrupti dolore Aut sint temporibus quo recusandae officia et odit possimus At atque consequatur sit iusto excepturi omnis neque id dolores ipsam et voluptatum possimus vel voluptatem repellendus est voluptate obcaecati At facere assumenda et accusamus rerum 33 modi quia aut velit repellat quo beatae iste qui voluptatibus nemo aut maxime sint`;

const firstNames = [
  'John',
  'Jacob',
  'Samuel',
  'Chris',
  'Peter',
  'Rahul',
  'Sonia',
  'Ashley',
  'Tanya',
  'Tom',
];

const lastNames = [
  'Doe',
  'Holland',
  'Hanks',
  'Moody',
  'Harris',
  'Jane',
  'Hardy',
  'Sanders',
  'Cook',
  'Williams',
];

const places = [
  'London',
  'New York',
  'Chicago',
  'New Mexico',
  'California',
  'Mumbai',
  'Delhi',
  'Kolkata',
  'Chennai',
  'Hyderabad',
];

const animals = ['Lion', 'Tiger', 'Leopard', 'Dog', 'Cat', 'Rabbit'];

const things = ['Shoes', 'Pen', 'Slate', 'Table', 'Chair', 'Sofa', 'Lamp'];

const values = {
  getString(length = 1): string {
    const start = random();
    const end = start + length;
    return loremIpsum.split(' ').slice(start, end).join(' ');
  },
  getName(): string {
    return firstNames[random(0, firstNames.length - 1)];
  },
  getFullName(): string {
    return `${firstNames[random(0, firstNames.length - 1)]} ${
      lastNames[random(0, lastNames.length - 1)]
    }`;
  },
  getLastName(): string {
    return lastNames[random(0, lastNames.length - 1)];
  },
  getPlace(): string {
    return places[random(0, places.length - 1)];
  },
  getAnimal(): string {
    return animals[random(0, animals.length - 1)];
  },
  getThing(): string {
    return things[random(0, things.length - 1)];
  },
  getNumber(min = 0, max = 1000): number {
    return random(min, max);
  },
  getCurrency(min?: number, max?: number, symbol = '$'): string {
    const number = new Intl.NumberFormat('en-US').format(
      this.getNumber(min, max)
    );
    return `${symbol}${number}`;
  },
  getBool(fixed?: boolean | number): boolean {
    return [false, true][typeof fixed === 'undefined' ? random(0, 1) : +fixed];
  },
  selectRandom<T = any>(args: T[] = []): T {
    return args[random(0, args.length - 1)];
  },
};

export default values;
