import { Item } from "./item.js";

export class BonifyItem extends Item{
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
    this.minQuality = 0;
    this.maxQuality = 50;
  }

  updateItemQuality (){
    if (this.name.toLowerCase().includes('backstage passes') && this.sellIn<0) {
      this.quality = this.minQuality;
      return;
    } else if(this.name.toLowerCase().includes('backstage passes') && this.sellIn<=5){
      this.quality >= this.maxQuality - 2 ? this.quality = this.maxQuality : this.quality += 3;
      return;
    } else if (this.name.toLowerCase().includes('backstage passes') && this.sellIn <= 10) {
      this.quality >= this.maxQuality-1 ? this.quality = this.maxQuality : this.quality += 2;
      return;
    }
    this.quality >= 50 ? this.quality = 50 : this.quality += 1;
  }
}