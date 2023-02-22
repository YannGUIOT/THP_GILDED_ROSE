import { Item } from "./item.js";

export class StandardItem extends Item{
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
    this.minQuality = 0;
    this.maxQuality = 50;
  }

  updateItemQuality () {
    if (this.sellIn < 0) {
      this.name.toLowerCase().includes('conjured') ? this.quality -= 4 : this.quality -= 2;
    } else {
      this.name.toLowerCase().includes('conjured') ? this.quality -= 2 : this.quality -= 1;
    }
    if (this.quality < 0) {
      this.quality = this.minQuality
    }
  }
}