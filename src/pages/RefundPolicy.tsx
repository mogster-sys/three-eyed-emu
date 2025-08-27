import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Clock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost"
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">14-Day Money Back Guarantee</h2>
            </div>
            <p className="text-muted-foreground">
              We're confident you'll love our apps. That's why we offer a 14-day money-back guarantee on all purchases.
            </p>
          </div>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Eligibility for Refunds</h2>
              <div className="space-y-3">
                <p>You are eligible for a full refund if:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You request a refund within 14 days of purchase</li>
                  <li>The app doesn't work as described in its listing</li>
                  <li>You experience technical issues that we cannot resolve</li>
                  <li>You haven't violated our Terms of Service</li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Contact Support</h3>
                    <p className="text-muted-foreground">Email us at threeeyedemu@zohomail.com.au with your order number</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Provide Details</h3>
                    <p className="text-muted-foreground">Include your purchase date and reason for the refund request</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Processing</h3>
                    <p className="text-muted-foreground">We'll process your refund within 3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="mb-2">Refunds are typically processed within 3-5 business days of approval.</p>
                  <p className="text-muted-foreground">
                    Please note that it may take an additional 5-10 business days for the refund to appear in your account, depending on your payment method and financial institution.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Exceptions</h2>
              <p className="mb-3">Refunds may be denied if:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>The request is made after 14 days from purchase</li>
                <li>You have violated our Terms of Service</li>
                <li>You have already received a refund for the same product</li>
                <li>The purchase was made through a third-party platform</li>
              </ul>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold">Need Help?</h2>
              </div>
              <p className="text-muted-foreground mb-3">
                If you have any questions about our refund policy or need assistance with a refund request, please contact us:
              </p>
              <div className="space-y-1">
                <p>Email: threeeyedemu@zohomail.com.au</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;