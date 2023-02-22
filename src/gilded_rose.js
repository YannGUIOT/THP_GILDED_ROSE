import { StandardItem } from "./standardItem.js";
import { BonifyItem } from "./bonifyItem.js";
import { LegendaryItem } from "./legendaryItem.js";
export class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality(){
    this.items.forEach((item) => {
      item.sellIn -= 1
      item.updateItemQuality()
    })
    return this.items;
  }

  createItems(data){
    data.forEach((item) => {
      if (item.name === 'Sulfuras') {
        this.items.push(new LegendaryItem(item.name, item.sellIn, item.quality))
      } else if (item.name.toLowerCase().includes('aged') || item.name.toLowerCase().includes('backstage passes')) {
        this.items.push(new BonifyItem(item.name, item.sellIn, item.quality))
      } else {
        this.items.push(new StandardItem(item.name, item.sellIn, item.quality))
      }
    })
  }

};

let data = [
  {
    name: "+5 Dexterity Vest",
    sellIn: 10,
    quality: 20
  },
  {
    name: "Mana Cake",
    sellIn: 3,
    quality: 6
  },
  {
    name: "Backstage passes",
    sellIn: 3,
    quality: 48
  },
  {
    name: "Aged Brie",
    sellIn: 15,
    quality: 6
  },
  {
    name: "Sulfuras",
    sellIn: null,
    quality: 80
  },
  {
    name: "Conjured Magic Stick",
    sellIn: 15,
    quality: 23
  }
];


const gildedRose = new Shop();
gildedRose.createItems(data)
gildedRose.updateQuality();