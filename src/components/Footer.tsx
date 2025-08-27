import { Link } from 'react-router-dom';
import { Shield, CreditCard, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Three Eyed Emu</h3>
            <p className="text-sm text-muted-foreground">
              Premium apps and digital experiences for the modern world.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:threeeyedemu@zohomail.com.au" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </a>
              </li>
              <li>
                <Link to="/downloads" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  My Downloads
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Security & Trust</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Payments via Stripe</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ABN: 60 976 457 601
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Three Eyed Emu. All rights reserved. | threeeyedemu.com.au
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;