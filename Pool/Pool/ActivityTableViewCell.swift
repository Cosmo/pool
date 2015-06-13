//
//  ActivityTableViewCell.swift
//  
//
//  Created by Devran Uenal on 13.06.15.
//
//

import UIKit

class ActivityTableViewCell: UITableViewCell {
    var usernameLabel:          UILabel
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }
    
    override init(style: UITableViewCellStyle, reuseIdentifier: String?) {
        self.usernameLabel          = UILabel()
        
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        self.contentView.addSubview(self.usernameLabel)
    }

    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        self.usernameLabel.frame        = CGRect(x: 0, y: 0, width: self.frame.size.width, height: self.frame.size.height)
    }

}
