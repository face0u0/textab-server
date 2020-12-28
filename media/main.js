
const defs = {
    showBtnList: true,
    lang: 'en',
    mark: {
      align: {
        default: 'left',
        left: 'left',
        center: 'center',
        right: 'right'
      },
      btn: {
        group: 'a-table-btn-list',
        item: 'a-table-btn',
        itemActive: 'a-table-btn-active'
      },
      icon: {
        alignLeft: 'a-table-icon a-table-icon-left',
        alignCenter: 'a-table-icon a-table-icon-center',
        alignRight: 'a-table-icon a-table-icon-right',
        undo: 'a-table-icon a-table-icon-undo',
        merge: 'a-table-icon a-table-icon-merge02',
        split: 'a-table-icon a-table-icon-split02',
        table: 'a-table-icon a-table-icon-th02',
        source: 'a-table-icon a-table-icon-source01',
        td: 'a-table-icon a-table-icon-td03',
        th: 'a-table-icon a-table-icon-th02'
      },
      selector: {
        self: 'a-table-selector'
      }
    }
  }

const table = new aTable('#table', defs);