import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
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
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using this website (threeeyedemu.com.au) and our services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
            <p className="mb-4">
              Upon purchasing our applications, we grant you a personal, non-transferable, non-exclusive license to use the software on your devices in accordance with these terms.
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>You may not modify or reverse engineer our applications</li>
              <li>You may not redistribute or resell our applications</li>
              <li>You must not remove any copyright or proprietary notations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Purchases and Refunds</h2>
            <p className="mb-4">
              All purchases are final. We offer a 14-day satisfaction guarantee on all digital products. If you are not satisfied with your purchase, contact us for a full refund.
            </p>
            <p className="mb-4">
              Payment processing is handled by Stripe. By making a purchase, you agree to Stripe's terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
            <p className="mb-4">
              The materials on Three Eyed Emu's website and applications are provided on an 'as is' basis. Three Eyed Emu makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
            <p className="mb-4">
              In no event shall Three Eyed Emu or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use our materials, even if Three Eyed Emu has been notified of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Governing Law</h2>
            <p className="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws of Australia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
            <p className="mb-4">
              If you have any questions regarding these Terms of Service, please contact us at:
            </p>
            <p>Email: threeeyedemu@zohomail.com.au</p>
            <p>Website: threeeyedemu.com.au</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;