import util from '../utils/index'

function ascByTimeMemo(memos) {
    let arr = util.bubbleSort(memos, "timestamp", "asc");
    arr = arr.map(item => item);
    return arr;
}
function descByTimeMemo(memos) {
    let arr = util.bubbleSort(memos, "timestamp", "desc");
    arr = arr.map(item => item);
    return arr;
}

const getters = {
    allMemos: function (state) {
        return function (params) {
            let memo = state.memos;
            return params ? ascByTimeMemo(memo) : descByTimeMemo(memo);
        }
    },
    completedMemos: function (state) {
        return function (params) {
            let memo = state.memos.filter(memo => memo.completed);
            return params ? ascByTimeMemo(memo) : descByTimeMemo(memo);
        }
    },
    incompleteMemos: function (state) {
        return function (params) {
            let memo = state.memos.filter(memo => !memo.completed);
            return params ? ascByTimeMemo(memo) : descByTimeMemo(memo);
        }
    },
    starMemos: function (state) {
        return function (params) {
            let memo = state.memos.filter(memo => memo.star);
            return params ? ascByTimeMemo(memo) : descByTimeMemo(memo);
        }
    },
    work: function (state) {
        return function (params) {
            let memo = state.memos.filter(memo => memo.categoryId === 0);
            return params ? ascByTimeMemo(memo) : descByTimeMemo(memo);
        }
    },
    study: function (state) {
        return function (params) {
            let memo = state.memos.filter(memo => memo.categoryId === 1);
            return params ? ascByTimeMemo(memo) : descByTimeMemo(memo);
        }
    },
    life: function (state) {
        return function (params) {
            let memo = state.memos.filter(memo => memo.categoryId === 2);
            return params ? ascByTimeMemo(memo) : descByTimeMemo(memo);
        }
    }
};

export default getters;