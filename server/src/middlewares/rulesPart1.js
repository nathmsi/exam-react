


// function bagContainData (bugContain, dataMustContain) {
//     let dataContain = dataMustContain
//     bugContain.foreach(
//         bag => {
//             if (!dataContain.includes(bag)) {
//                return false
//             }
//         }
//     )
//     return true
// }

// export function rules1(){
//     try {
//         const data = req.body
//         if (data) {
//             data.foreach(
//                 el => {
//                     switch (el.name) {
//                         case 'light red bags': {
//                             if (bagContainData(el.bags,['1 bright white bag','2 muted yellow bags'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         case 'dark orange bags': {
//                             if (bagContainData(el.bags,['3 bright white bags','4 muted yellow bags'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         case 'bright white bags': {
//                             if (bagContainData(el.bags,['1 shiny gold bag'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         case 'muted yellow bags': {
//                             if (bagContainData(el.bags,['2 shiny gold bags','9 faded blue bags'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         case 'shiny gold bags': {
//                             if (bagContainData(el.bags,['2 shiny gold bags','9 faded blue bags'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         case 'dark olive bags': {
//                             if (bagContainData(el.bags,['2 shiny gold bags','9 faded blue bags'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         case 'vibrant plum bags': {
//                             if (bagContainData(el.bags,['2 shiny gold bags','9 faded blue bags'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         case 'faded blue bags': {
//                             if (bagContainData(el.bags,['2 shiny gold bags','9 faded blue bags'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         case 'dotted black bags': {
//                             if (bagContainData(el.bags,['2 shiny gold bags','9 faded blue bags'])){
//                                 break;
//                             } else {
//                                 res.status(403).send('input not correct');
//                             }
//                         } 
//                         default: {
//                             break;
//                         }
//                     }
//                 }
//             )
//             next();
//         }
//     } catch (error) {
//         res.status(403).send('input not correct');
//     }
// };