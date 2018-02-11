# fuzzy

```javascript
import { fuzzFunction } from 'fuzzy';

const errors = fuzzFunction(fs.writeFileSync);
```

```javascript
import random from 'fuzzy';

console.log(random());
/*
Set {
  Promise { undefined },
  false,
  [AsyncFunction: af],
  Float64Array [ 32, 4, 21, 92, 27, 103, 43, 123, 40, 115 ],
  '蔛匫㪯�쌽抋㕗ᾒ弭',
  WeakSet {} }
*/
```

You can also import all the individual methods
```javascript
import { object } from 'fuzzy';
console.log(object());
/*
{ '䛺늙휠�ꇆ䣽ㄱ慰뜐': [Getter/Setter],
  '鷭랦�㲠幘聩䖾젶쁟': { '콨撐Ὗ쩌㒌쑁顠낓ꞛ䃔': [Getter/Setter] },
  '軁뢧ꉷ偉胕顴䩈ꐃ뮲鯬': Set { undefined } }
*/
```
