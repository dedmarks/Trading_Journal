import { createSlice } from '@reduxjs/toolkit';

const getInitialTrade = () => {
  const localTradeList = window.localStorage.getItem('tradeList');
  if (localTradeList) {
    return JSON.parse(localTradeList);
  }
  window.localStorage.setItem('tradeList', []);
  return []
};



const initialState = {
  tradeList: getInitialTrade(),
  winlongs: 0,
  longs: 0,
  balance: 0,
  balanceList: [],
  tradebalance: [],
  wins: 0,
  shorts: 0,
  winshorts: 0,
};

export const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    addTrade: (state, action) => {
      state.tradeList.push(action.payload);
      const tradeList = window.localStorage.getItem('tradeList');
      if (tradeList) {
        const tradeListArr = JSON.parse(tradeList);
        tradeListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('tradeList', JSON.stringify(tradeListArr));
      } else {
        window.localStorage.setItem(
          'tradeList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },

    addBalance: (state,action) => {
      state.balance= state.balance + parseInt(action.payload)
      state.balanceList.push(state.balance)
      state.tradebalance.push(parseInt(action.payload))
    },

    addTag: (state, action) => {
      state.tradeList.push(action.payload);
      const tradeList = window.localStorage.getItem('tradeList');
      if (tradeList) {
        const tradeListArr = JSON.parse(tradeList);
        tradeListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('tradeList', JSON.stringify(tradeListArr));
      } else {
        window.localStorage.setItem(
          'tradeList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },


    updateTrade: (state, action) => {
      const tradeList = window.localStorage.getItem('tradeList');
      if (tradeList) {
        const tradeListArr = JSON.parse(tradeList);
        tradeListArr.forEach((trade) => {
          if (trade.id === action.payload.id) {
            trade.asset = action.payload.asset;
            trade.date = action.payload.date;
            trade.size = action.payload.size;
            trade.exit = action.payload.exit;
            trade.entry = action.payload.entry;
            trade.type = action.payload.type;
            trade.status = action.payload.status;
            trade.confluance = action.payload.confluance;
          }
        });
        window.localStorage.setItem('tradeList', JSON.stringify(tradeListArr));
        state.tradeList = [...tradeListArr];
      }
    },
    deleteTrade: (state, action) => {
      const tradeList = window.localStorage.getItem('tradeList');
      if (tradeList) {
        const tradeListArr = JSON.parse(tradeList);
        tradeListArr.forEach((trade, index) => {
          if (trade.id === action.payload) {
            tradeListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('tradeList', JSON.stringify(tradeListArr));
        state.tradeList = tradeListArr;
      }
    },
    winLongs: (state, action) => {
        let winLongs= 0
        let winShorts= 0
        let longs= 0
        let shorts= 0
        let wins= 0
        
        const tradeList = window.localStorage.getItem('tradeList');
        if (tradeList) {
          const tradeListArr = JSON.parse(tradeList);
          tradeListArr.forEach((trade) => {
            if (trade.status === 'Win' && trade.type === 'Long') {
              winLongs++
            }else if(trade.status === 'Win' && trade.type === 'Short'){
              winShorts++
            }

            if (trade.type === 'Long'){
              longs++
            } else if(trade.type === 'Short'){
              shorts++
            }

            if(trade.status === 'Win'){
              wins++
            }
          });
          state.winlongs= winLongs
          state.winshorts= winShorts
          state.longs= longs
          state.shorts= shorts
          state.wins= wins
        }
      },
  },
});

export const { addTrade, updateTrade, deleteTrade, winLongs, addTag, addBalance } =
  tradeSlice.actions;
export default tradeSlice.reducer;
