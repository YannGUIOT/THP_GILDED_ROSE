import { Shop } from '../src/gilded_rose.js';
import { StandardItem } from '../src/standardItem.js';
import {BonifyItem} from '../src/bonifyItem.js';
import { LegendaryItem } from '../src/legendaryItem.js';

describe("GildedRose shop manager", function () {
  let listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new StandardItem("+5 Dexterity Vest", 10, 20));
    listItems.push(new StandardItem("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité et 1 sellIn d'item normaux (sellIn <=0)", function () {
    listItems.push(new StandardItem("+5 Dexterity Vest", -2, 20));
    listItems.push(new StandardItem("Mana Cake", -10, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -3, quality: 18 },
      { sellIn: -11, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new BonifyItem("Aged Brie", 20, 30));
    listItems.push(new BonifyItem("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 2 pour Backstage passes", function () {
    listItems.push(new BonifyItem("Backstage passes to a TAFKAL80ETC concert", 9, 30));
    listItems.push(new BonifyItem("Backstage passes to a TAFKAL80ETC concert", 7, 22));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 8, quality: 32 },
      { sellIn: 6, quality: 24 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 3 pour Backstage passes", function () {
    listItems.push(new BonifyItem("Backstage passes to a TAFKAL80ETC concert", 3, 30));
    listItems.push(new BonifyItem("Backstage passes to a TAFKAL80ETC concert", 2, 15));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 2, quality: 33 },
      { sellIn: 1, quality: 18 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Diminuer la qualité à 0 pour Backstage passes", function () {
    listItems.push(new BonifyItem("Backstage passes to a TAFKAL80ETC concert", -2, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -3, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité ne dépasse pas 50 pour tous sauf Sulfuras", function () {
    listItems.push(new StandardItem("+5 Dexterity Vest", -15, 48));
    listItems.push(new StandardItem("Conjured", -15, 35));
    listItems.push(new BonifyItem("Backstage passes to a TAFKAL80ETC concert", 3, 49));
    listItems.push(new BonifyItem("Aged Brie", 20, 49));
    listItems.push(new LegendaryItem("Sulfuras", null, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -16, quality: 46 },
      { sellIn: -16, quality: 31 },
      { sellIn: 2, quality: 50 },
      { sellIn: 19, quality: 50 },
      { sellIn: null, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité ne descend pas en dessous de 0", function () {
    listItems.push(new StandardItem("+5 Dexterity Vest", -15, 1));
    listItems.push(new StandardItem("Conjured", -22, 2));
    listItems.push(new BonifyItem("Backstage passes to a TAFKAL80ETC concert", 3, 22));
    listItems.push(new BonifyItem("Aged Brie", 20, 12));
    listItems.push(new LegendaryItem("Sulfuras", null, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -16, quality: 0 },
      { sellIn: -23, quality: 0 },
      { sellIn: 2, quality: 25 },
      { sellIn: 19, quality: 13 },
      { sellIn: null, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 2 la qualité et 1 sellIn d'item Conjured", function () {
    listItems.push(new StandardItem("Conjured Magic Stick", 15, 20));
    listItems.push(new StandardItem("Conjured", 12, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 14, quality: 18 },
      { sellIn: 11, quality: 4 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Baisser de 4 la qualité et 1 sellIn d'item Conjured sellin<=0", function () {
    listItems.push(new StandardItem("Conjured Magic Stick", -15, 20));
    listItems.push(new StandardItem("Conjured", -10, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -16, quality: 16 },
      { sellIn: -11, quality: 2 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});