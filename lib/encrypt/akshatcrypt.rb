module Akshatcrypt
    
    class Password < String
      attr_reader :checksum, :salt, :version, :cost
  
      class << self
       
        def create(secret, options = {})
          cost = options[:cost] || Akshatcrypt::Engine.cost
          raise ArgumentError if cost > Akshatcrypt::Engine::MAX_COST
          Password.new(BCrypt::Engine.hash_secret(secret, BCrypt::Engine.generate_salt(cost)))
        end
  
        def valid_hash?(h)
          /\A\$[0-9a-z]{2}\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}\z/ === h
        end
      end
  
      def initialize(raw_hash)
        if valid_hash?(raw_hash)
          self.replace(raw_hash)
          @version, @cost, @salt, @checksum = split_hash(self)
        else
          raise Errors::InvalidHash.new("invalid hash")
        end
      end
  

      def ==(secret)
        super(Akshatcrypt::Engine.hash_secret(secret, @salt))
      end
      alias_method :is_password?, :==
  
    private
      def valid_hash?(h)
        self.class.valid_hash?(h)
      end

      def split_hash(h)
        _, v, c, mash = h.split('$')
        return v.to_str, c.to_i, h[0, 29].to_str, mash[-31, 31].to_str
      end
    end
  end