import classNames from 'classnames/bind';

import styles from './LevelTable.module.scss';

const cx = classNames.bind(styles);

function LevelTable() {
    return (
        <div className={cx('container')}>
            <div className={cx('row', 'justify-content-center')}>
                <div>
                    <h2 className={cx('heading-section')}>Table #08</h2>
                </div>
            </div>

            <div className={cx('row')}>
                <div class="col-md-12">
                    <h3 className={cx('text-center')}>Collapsible Table</h3>
                    <div className={cx('table-wrap')}>
                        <table className={cx('table', 'myaccordion', 'table-hover')}>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    data-toggle="collapse"
                                    data-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                >
                                    <th scope="row">1</th>
                                    <td>Laptop Technology AS2020</td>
                                    <td>$200.00</td>
                                    <td>2</td>
                                    <td>$400.00</td>
                                    <td>
                                        <i class="fa" aria-hidden="true"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={cx('collapse', 'show', 'acc')}>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro iste, facere
                                            sunt sequi nostrum ipsa, amet doloremque magnam reiciendis tempore sapiente.
                                            Necessitatibus recusandae harum nam sit perferendis quia inventore natus.
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LevelTable;
