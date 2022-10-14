import { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    return (
      // stripe checkout component
      <StripeCheckout
        name='Emaily'
        description='$5 for 5 email credits'
        amount={500}
        token={(token) => this.props.handleToken(token)}
        stripeKey={'pk_test_CDHFOoSp79lNHuKvUqYXD3pJ006bbkLu2d'}
      >
        <button className='btn'>Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
