import { createSlice } from '@reduxjs/toolkit';

const getInitialTrade = () => {
  const localTradeList = window.localStorage.getItem('tradeList');
  if (localTradeList) {
    return JSON.parse(localTradeList);
  }
  window.localStorage.setItem('tradeList', []);
  return []
};

const getbalance = () => {
  const balList = window.localStorage.getItem('balance');
  if (balList) {
    return JSON.parse(balList);
  }
  window.localStorage.setItem('balance', 0);
  return 0
};  

const getBalanceList = () => {
  const bal = window.localStorage.getItem('balanceList');
  if (bal) {
    return JSON.parse(bal);
  }
  window.localStorage.setItem('balanceList', []);
  return []
};  

const getTradeBalance = () => {
  const bal = window.localStorage.getItem('tradeBalance');
  if (bal) {
    return JSON.parse(bal);
  }
  window.localStorage.setItem('tradeBalance', []);
  return []
};  
 

const initialState = {
  tradeList: getInitialTrade(),
  winlongs: 0,
  user: null,
  longs: 0,
  balance: getbalance(),
  balanceList: getBalanceList(),
  tradebalance: getTradeBalance(),
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

    setUser: (state,action) => {
      state.user= action.payload
    },

    addBalance: (state,action) => {
      state.balance= state.balance + parseInt(action.payload)
      state.balanceList.push(state.balance)
      state.tradebalance.push(parseInt(action.payload))
      window.localStorage.setItem('balance', state.balance)
      const balanceList = window.localStorage.getItem('balanceList');
      if (balanceList) {
        const tradeListArr = JSON.parse(balanceList);
        tradeListArr.push(
          state.balance,
        );
        window.localStorage.setItem('balanceList', JSON.stringify(tradeListArr));
      } else {
        window.localStorage.setItem(
          'balanceList',
          JSON.stringify([
              action.payload,
          ])
        );
      }
      const tradeBalance = window.localStorage.getItem('tradeBalance');
      if (tradeBalance) {
        const arr = JSON.parse(tradeBalance);
        arr.push(
          parseInt(action.payload),
        );
        window.localStorage.setItem('tradeBalance', JSON.stringify(arr));
      } else {
        window.localStorage.setItem(
          'tradeBalance',
          JSON.stringify([
              action.payload,
          ])
        );
      }            
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
      const balanceList = window.localStorage.getItem('balanceList');
      const tradeBalance = window.localStorage.getItem('tradeBalance');


      if (tradeList && balanceList && tradeBalance) {
        const tradeListArr = JSON.parse(tradeList);
        const arr = JSON.parse(tradeBalance);
        const balanceListArr = JSON.parse(balanceList);
        
        tradeListArr.forEach((trade,index) => {
          if (trade.id === action.payload.id) {
            trade.asset = action.payload.asset;
            trade.date = action.payload.date;
            trade.size = action.payload.size;
            balanceListArr[balanceListArr.length - 1]-= trade.profit
            arr.splice(index, 1)
            trade.exit = action.payload.exit;
            state.balance= state.balance - trade.profit
            trade.entry = action.payload.entry;
            trade.type = action.payload.type;
            trade.profit= action.payload.profit;
            trade.status = action.payload.status;
            trade.confluance = action.payload.confluance;
          }
        });
        window.localStorage.setItem('tradeBalance', JSON.stringify(arr));
        window.localStorage.setItem('balanceList', JSON.stringify(balanceListArr));
        window.localStorage.setItem('tradeList', JSON.stringify(tradeListArr)); 
        state.tradeList = [...tradeListArr];
        state.balanceList= balanceListArr;
        state.tradebalance=arr
      }
    },
    deleteTrade: (state, action) => {
      const tradeList = window.localStorage.getItem('tradeList');
      const tradeBalance = window.localStorage.getItem('tradeBalance');
      const balanceList = window.localStorage.getItem('balanceList');

      if (tradeList && tradeBalance && balanceList) {
        const arr = JSON.parse(tradeBalance);
        const tradeListArr = JSON.parse(tradeList);
        const balanceListArr = JSON.parse(balanceList);

        tradeListArr.forEach((trade, index) => {
          if (trade.id === action.payload) {
            tradeListArr.splice(index, 1);
            balanceListArr[balanceListArr.length - 1]-= trade.profit
            arr.splice(index,1);
            state.balance-= trade.profit
          }
        });
        window.localStorage.setItem('tradeBalance', JSON.stringify(arr));
        window.localStorage.setItem('balanceList', JSON.stringify(balanceListArr));
        window.localStorage.setItem('tradeList', JSON.stringify(tradeListArr));
        state.tradeList = tradeListArr;
        state.balanceList= balanceListArr;
        state.tradebalance= arr;
      }
    },
    winLongs: (state) => {
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

export const { addTrade, updateTrade, deleteTrade, winLongs, addTag, addBalance, setUser } =
  tradeSlice.actions;
  export const selectUserName= state => state.trade.userName
  export const selectEmailName= state => state.trade.userEmail
export default tradeSlice.reducer;
