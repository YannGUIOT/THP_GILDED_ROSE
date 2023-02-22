import { Item } from "./item.js";

export class LegendaryItem extends Item{
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  updateItemQuality(){
    this.sellIn = null
    return;
  }
}