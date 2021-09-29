import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { connect } from "react-redux";

const province = [
  { id: "address_province:", label: "Address Province:Unknown" },
  { id: "address_province:Amnat Charoen", label: "Address Province:Amnat Charoen" },
  { id: "address_province:Ang Thong", label: "Address Province:Ang Thong" },
  { id: "address_province:Bangkok", label: "Address Province:Bangkok" },
  { id: "address_province:Bueng Kan", label: "Address Province:Bueng Kan" },
  { id: "address_province:Buri Ram", label: "Address Province:Buri Ram" },
  { id: "address_province:Chachoengsao", label: "Address Province:Chachoengsao" },
  { id: "address_province:Chai Nat", label: "Address Province:Chai Nat" },
  { id: "address_province:Chaiyaphum", label: "Address Province:Chaiyaphum" },
  { id: "address_province:Chanthaburi", label: "Address Province:Chanthaburi" },
  { id: "address_province:Chiang Mai", label: "Address Province:Chiang Mai" },
  { id: "address_province:Chiang Rai", label: "Address Province:Chiang Rai" },
  { id: "address_province:Chonburi", label: "Address Province:Chonburi" },
  { id: "address_province:Chumphon", label: "Address Province:Chumphon" },
  { id: "address_province:Kalasin", label: "Address Province:Kalasin" },
  { id: "address_province:Kamphaeng Phet", label: "Address Province:Kamphaeng Phet" },
  { id: "address_province:Kanchanaburi", label: "Address Province:Kanchanaburi" },
  { id: "address_province:Khon Kaen", label: "Address Province:Khon Kaen" },
  { id: "address_province:Krabi", label: "Address Province:Krabi" },
  { id: "address_province:Lampang", label: "Address Province:Lampang" },
  { id: "address_province:Lamphun", label: "Address Province:Lamphun" },
  { id: "address_province:Loei", label: "Address Province:Loei" },
  { id: "address_province:Lopburi", label: "Address Province:Lopburi" },
  { id: "address_province:Mae Hong Son", label: "Address Province:Mae Hong Son" },
  { id: "address_province:Maha Sarakham", label: "Address Province:Maha Sarakham" },
  { id: "address_province:Mukdahan", label: "Address Province:Mukdahan" },
  { id: "address_province:Nakhon Nayok", label: "Address Province:Nakhon Nayok" },
  { id: "address_province:Nakhon Pathom", label: "Address Province:Nakhon Pathom" },
  { id: "address_province:Nakhon Phanom", label: "Address Province:Nakhon Phanom" },
  { id: "address_province:Nakhon Ratchasima", label: "Address Province:Nakhon Ratchasima" },
  { id: "address_province:Nakhon Sawan", label: "Address Province:Nakhon Sawan" },
  { id: "address_province:Nakhon Si Thammarat", label: "Address Province:Nakhon Si Thammarat" },
  { id: "address_province:Nan", label: "Address Province:Nan" },
  { id: "address_province:Narathiwat", label: "Address Province:Narathiwat" },
  { id: "address_province:Nong Bua Lamphu", label: "Address Province:Nong Bua Lamphu" },
  { id: "address_province:Nong Khai", label: "Address Province:Nong Khai" },
  { id: "address_province:Nonthaburi", label: "Address Province:Nonthaburi" },
  { id: "address_province:Pathum Thani", label: "Address Province:Pathum Thani" },
  { id: "address_province:Pattani", label: "Address Province:Pattani" },
  { id: "address_province:Phang Nga", label: "Address Province:Phang Nga" },
  { id: "address_province:Phatthalung", label: "Address Province:Phatthalung" },
  { id: "address_province:Phayao", label: "Address Province:Phayao" },
  { id: "address_province:Phetchabun", label: "Address Province:Phetchabun" },
  { id: "address_province:Phetchaburi", label: "Address Province:Phetchaburi" },
  { id: "address_province:Phichit", label: "Address Province:Phichit" },
  { id: "address_province:Phitsanulok", label: "Address Province:Phitsanulok" },
  { id: "address_province:Phra Nakhon Si Ayutthaya", label: "Address Province:Phra Nakhon Si Ayutthaya" },
  { id: "address_province:Phrae", label: "Address Province:Phrae" },
  { id: "address_province:Phuket", label: "Address Province:Phuket" },
  { id: "address_province:Prachin Buri", label: "Address Province:Prachin Buri" },
  { id: "address_province:Prachuap Khiri Khan", label: "Address Province:Prachuap Khiri Khan" },
  { id: "address_province:Ranong", label: "Address Province:Ranong" },
  { id: "address_province:Ratchaburi", label: "Address Province:Ratchaburi" },
  { id: "address_province:Rayong", label: "Address Province:Rayong" },
  { id: "address_province:Roi Et", label: "Address Province:Roi Et" },
  { id: "address_province:Sa Kaeo", label: "Address Province:Sa Kaeo" },
  { id: "address_province:Sakon Nakhon", label: "Address Province:Sakon Nakhon" },
  { id: "address_province:Samut Prakan", label: "Address Province:Samut Prakan" },
  { id: "address_province:Samut Sakhon", label: "Address Province:Samut Sakhon" },
  { id: "address_province:Samut Songkhram", label: "Address Province:Samut Songkhram" },
  { id: "address_province:Saraburi", label: "Address Province:Saraburi" },
  { id: "address_province:Satun", label: "Address Province:Satun" },
  { id: "address_province:Sing Buri", label: "Address Province:Sing Buri" },
  { id: "address_province:Sisaket", label: "Address Province:Sisaket" },
  { id: "address_province:Songkhla", label: "Address Province:Songkhla" },
  { id: "address_province:Sukhothai", label: "Address Province:Sukhothai" },
  { id: "address_province:Suphan Buri", label: "Address Province:Suphan Buri" },
  { id: "address_province:Surat Thani", label: "Address Province:Surat Thani" },
  { id: "address_province:Surin", label: "Address Province:Surin" },
  { id: "address_province:Tak", label: "Address Province:Tak" },
  { id: "address_province:Trang", label: "Address Province:Trang" },
  { id: "address_province:Trat", label: "Address Province:Trat" },
  { id: "address_province:Ubon Ratchathani", label: "Address Province:Ubon Ratchathani" },
  { id: "address_province:Udon Thani", label: "Address Province:Udon Thani" },
  { id: "address_province:Uthai Thani", label: "Address Province:Uthai Thani" },
  { id: "address_province:Uttaradit", label: "Address Province:Uttaradit" },
  { id: "address_province:Yala", label: "Address Province:Yala" },
  { id: "address_province:Yasothon", label: "Address Province:Yasothon" },
]

const svocData = [
  { id: "inferred_gender:", label: "Inferred Gender:Unknown" },
  { id: "inferred_gender:Male", label: "Inferred Gender:Male" },
  { id: "inferred_gender:Female", label: "Inferred Gender:Female" },
  { id: "inferred_marital_status:", label: "Inferred Marital Status:Unknown" },
  { id: "inferred_marital_status:Single", label: "Inferred Marital Status:Single" },
  { id: "inferred_marital_status:Married", label: "Inferred Marital Status:Married" },
  { id: "the1_inter:Yes", label: "The 1 Inter:Yes" },
  { id: "the1_inter:No", label: "The 1 Inter:No" },
  { id: "have_kids:Yes", label: "Have Kids:Yes" },
  { id: "have_kids:No", label: "Have Kids:No" },
  { id: "kids_stage:Infant", label: "Kids Stage:Infant" },
  { id: "kids_stage:Junior", label: "Kids Stage:Junior" },
  { id: "kids_stage:Presch", label: "Kids Stage:Presch" },
  { id: "kids_stage:Teen", label: "Kids Stage:Teen" },
  { id: "kids_stage:Toddler", label: "Kids Stage:Toddler" },
  { id: "kids_stage:Unknown", label: "Kids Stage:Unknown" },
].concat(province);

class T1SVOCTypeahead extends Component {
  
  clear() {
    this.typeAHead.getInstance().clear();
  }

  render() {
    return (
      <Typeahead
        id="cgo-t1-svoc"
        clearButton
        ref={typeAHead => (this.typeAHead = typeAHead)}
        multiple={true}
        labelKey={option => `${option.label}`}
        onChange={this.props.onChange}
        options={svocData}
        placeholder="Please select SVOC criteria."
      ></Typeahead>
    );
  }
}

function mapStateToProps(state) {
  const { brands, brandIsLoading, brandIsDisabled, selectedBrands } = state;
  return {
    brands: brands,
    brandIsLoading: brandIsLoading,
    brandIsDisabled: brandIsDisabled,
    selectedBrands: selectedBrands,
  };
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(T1SVOCTypeahead);
