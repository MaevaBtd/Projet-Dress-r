import { connect } from 'react-redux';
import App from 'src/components/App';
import { fetchClothContent } from '../store/cloth_reducer';

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  fetchClothContent: () => {
    dispatch(fetchClothContent());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
