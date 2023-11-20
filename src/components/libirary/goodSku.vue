<script setup name='goodSku'>
import { onMounted, reactive, ref, toRefs } from 'vue'
import powerSet from '@/vender/powerSet'
import axios from 'axios'
// 商品数据
const emitImg = ref('')
const props = defineProps(['goods'])
const { goods } = toRefs(props)
// const goods = ref('')
// const getGoods = async () => {
//     // 1135076  初始化就有无库存的规格
//     // 1369155859933827074 更新之后有无库存项（蓝色-20cm-中国）
//     const res = await axios.get('http://pcapi-xiaotuxian-front-devtest.itheima.net/goods?id=1369155859933827074')

//     goods.value = res.data.result
// };
let pathMap = null;
let splider = '☆'
// 定义一个有效的Sku数据
// 定义事件
const emit = defineEmits(['emitEffectiveSku'])
const EffectiveSku = reactive({
    specsText: '',
    inventory: '',
    oldPrice: '',
    price: '',
    skuId: '',
    img: ''
})
onMounted(async function () {
    // await getGoods()
    pathMap = effectiveSkus(goods.value)
    initDisabled(goods.value.specs, pathMap)


});

//改变选中状态
/**
 * @param {object} item 同一排商品的选中状态
 * @param {object} val  当前的选中状态
 *
1. 当前已激活的再次点击变为未激活
2. 当前未激活的点击把同排的变为未激活然后单独激活
 */
const selectChange = (item, val) => {
    // console.log(item, val, '选中');
    if (val.disabled) return
    if (val.selected) {
        val.selected = false
    } else {
        item.values.forEach(ele => {
            ele.selected = false
        });
        val.selected = true
    }

    if (val.picture) {
        emitImg.value = val.picture
    }
    // 测试选中数组函数
    // let zks = getSelectArr(goods.value.specs)
    // console.log(zks, '获取生成');
    // 点击生产
    clickDisabled(goods.value.specs, pathMap);
    // 生产有效的sku
    const flag = getSelectArr(goods.value.specs).every(item => item !== undefined);
    if (!flag) {
        // console.log('找到了,不可以产出');
        emit('emitEffectiveSku', {})
    } else {
        // console.log('找不到 可以产出');
        let str = getSelectArr(goods.value.specs).join(splider);
        let id = pathMap[str][0];
        let sku = goods.value.skus.find(item => item.id === id)
        // console.log(sku);
        EffectiveSku.skuId = id;
        EffectiveSku.specsText = str;
        EffectiveSku.inventory = sku.inventory;
        EffectiveSku.oldPrice = sku.oldPrice;
        EffectiveSku.price = sku.price;
        EffectiveSku.img = emitImg.value
        // console.log(EffectiveSku);
        emit('emitEffectiveSku', EffectiveSku)
    }
}
// sku生成
const effectiveSkus = (goods) => {
    let powerMap = {};

    //1. 生成有效的sku数组
    const skuItem = goods.skus.filter(item => item.inventory > 0);
    // console.log(skuItem, '有效数据');
    //2.组合成sku路径字段
    skuItem.forEach(item => {
        const skuMap = item.specs.map(item => item.valueName);
        // console.log(skuMap);
        let skuArr = powerSet(skuMap);//根据幂算法生成多少种可能
        // console.log(skuArr);
        // ['黑色']
        // ['20cm']
        // (2)['黑色', '20cm']
        // ['中国']
        // (2)['黑色', '中国']
        // (2)['20cm', '中国']
        // (3)['黑色', '20cm', '中国']
        skuArr.forEach((sub) => {
            const key = sub.join(splider); //设置 【蓝色☆中国】按照 key-value 存入对象
            // console.log(key);
            //  黑色
            //  20cm
            //  黑色☆20cm
            //  中国
            //  黑色☆中国
            //  20cm☆中国
            //  黑色☆20cm☆中国
            // 根据子集集合组合成一个路径字典，也就是对象。
            if (powerMap[key]) {
                //如果 [1,2] 是一样 就直接往数组 插入就行
                powerMap[key].push(item.id);
            } else {
                powerMap[key] = [item.id]; //如果不一样 就 赋值  设置成数组是为了方便如果有相同的值就直接插入ID
            }
        });

    })
    return powerMap
}


// 初始化禁用
const initDisabled = (specs, pathMap) => {
    // console.log(specs, pathMap);
    specs.forEach(item => {
        item.values.forEach(sub => {
            if (pathMap[sub.name]) {
                sub.disabled = false
            } else {
                sub.disabled = true
            }
        })
    })
}



// 获取匹配项的数组

const getSelectArr = (specs) => {
    let selectArr = []
    specs.forEach(item => {
        let selectedVal = item.values.find(sub => sub.selected)
        selectArr.push(selectedVal ? selectedVal.name : undefined)
    })
    return selectArr
}
//点击时禁用
const clickDisabled = (specs, pathMap) => {
    // console.log(pathMap);
    specs.forEach((item, index) => {
        // 1. 点击时得到选中的数组
        let clickSkuGoods = getSelectArr(specs);
        // console.log(clickSkuGoods, '匹配数组');
        item.values.forEach((sub) => {
            //2. 遍历规格插入到数组
            clickSkuGoods[index] = sub.name;
            //生成key去匹配
            const key = clickSkuGoods.filter(item => item).join(splider);
            // console.log(key);
            if (pathMap[key]) {
                sub.disabled = false;

            } else {
                sub.disabled = true
            }
        })
    })
}


</script>

<template>
    <div class="goods-sku">
        <dl v-for="item in goods.specs" :key="item.id">
            <dt>{{ item.name }}</dt>
            <dd>
                <template v-for="val in item.values" :key="val.name">
                    <!-- 图片类型规格 -->
                    <img v-if="val.picture" :class="{ selected: val.selected, disabled: val.disabled }"
                        @click="selectChange(item, val)" :src="val.picture" :title="val.name">
                    <!-- 文字类型规格 -->
                    <span v-else :class="{ selected: val.selected, disabled: val.disabled }"
                        @click="selectChange(item, val)">{{ val.name }}</span>
                </template>
            </dd>
        </dl>
    </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
        border-color: #27ba9b;
    }

    &.disabled {
        opacity: 0.6;
        border-style: dashed;
        cursor: not-allowed;
    }
}

.goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
        display: flex;
        padding-bottom: 20px;
        align-items: center;

        dt {
            width: 50px;
            color: #999;
        }

        dd {
            flex: 1;
            color: #666;

            >img {
                width: 50px;
                height: 50px;
                margin-bottom: 4px;
                @include sku-state-mixin;
            }

            >span {
                display: inline-block;
                height: 30px;
                line-height: 28px;
                padding: 0 20px;
                margin-bottom: 4px;
                @include sku-state-mixin;
            }
        }
    }
}
</style>