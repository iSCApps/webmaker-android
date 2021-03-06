var React = require('react/addons');

var LinkBlock = require('../../components/el/types/link.jsx');
var Alert = require('../../components/alert/alert.jsx');
var ColorGroup = require('../../components/color-group/color-group.jsx');
var Range = require('../../components/range/range.jsx');

var LinkEditor = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    require('./witheditable')
  ],
  getInitialState: function () {
    return LinkBlock.spec.flatten(this.props.element, {defaults: true});
  },
  componentDidUpdate: function () {
    this.props.cacheEdits(this.state);
  },
  onChangeLinkClick: function () {
    this.refs.notImplementedWarning.show();
  },
  render: function () {
    return (
      <div id="editor" onClick={this.stopEditing}>
        <div className="editor-preview">
          <LinkBlock {...this.state} ref="element" active={true} updateText={this.updateText} setEditMode={this.setEditing} />
        </div>
        <div className="editor-options">
          <div className="form-group">
            <button className="btn btn-block" onClick={this.editText}>{ this.state.editing? "Done" : "Edit Label"}</button>
          </div>
          <div className="form-group">
            <button onClick={this.onChangeLinkClick} className="btn btn-block">
              <img className="icon" src="../../img/change-image.svg" /> Set Link Destination
            </button>
            <Alert ref="notImplementedWarning">Coming Soon!</Alert>
          </div>
          <div className="form-group">
            <label>Corners</label>
            <Range id="borderRadius" min={0} value={this.state.borderRadius} max={32} unit="px" linkState={this.linkState} />
          </div>
          <div className="form-group">
            <label>Font</label>
            <select className="select" valueLink={this.linkState('fontFamily')}>
              <option value="Roboto">Roboto</option>
              <option value="Bitter">Bitter</option>
              <option value="Pacifico">Pacifico</option>
            </select>
          </div>
          <div className="form-group">
            <label>Background Color</label>
            <ColorGroup id="backgroundColor" linkState={this.linkState} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LinkEditor;
